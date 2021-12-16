import React, { useState, useEffect } from "react";
import axios from "axios";
// import CommentsBlock from "simple-react-comments";
import { CommentSection } from "react-comments-section";

import "react-comments-section/dist/index.css";

const client = axios.create({
  baseURL: "/",
});
const access_token = !JSON.parse(localStorage.getItem("user"))
  ? ""
  : JSON.parse(localStorage.getItem("user")).access_token;

export const ShopModal = ({
  talents,
  formatter,
  social,
  addItem,
  cart,
  comments,
  setComments,
}) => {
  const [modTalent, setModTalent] = useState(talents);
  let comm = {};
  const [user, setUser] = useState(null);
  const signinUrl = "/login";
  const signupUrl = "/signup";
  let count = 0;

  const getUser = async () => {
    const response = await client.post(
      "/users/",
      {},
      {
        headers: { access_token },
      },
    );

    if (response.data) {
      setUser(response.data);
    }
  };

  const getBirthddate = (date) => {
    return new Date(date).getDate();
  };

  if (talents) {
    talents.map((tale, key) => {
      comm[tale.talentId] = [];
    });
  }
  console.log(comm);

  if (comments) {
    comments.map((i) => count++);
    comments.map((comme, i) => {
      comm[comme.talentId].push({
        authorUrl: "#",
        avatarUrl: comme.user.avatar,
        fullName: comme.user.name,
        text: comme.comment,
      });
    });
  }
  useEffect(() => {
    getUser();
  }, []);

  console.log(comm);

  if (!social) return null;
  return (
    <>
      {talents.map((talent, key) => {
        return (
          <div
            class="modal fade"
            id={"theModal-" + talent.talent.id}
            style={{ zIndex: "9999999" }}
            role="dialog"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <button
                    type="button"
                    class="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span class="ti-close" aria-hidden="true"></span>
                  </button>
                </div>
                <div class="modal-body">
                  <div class="row no-gutters">
                    <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                      {/* <!-- Product Slider --> */}
                      <div class="product-gallery">
                        <img src={talent.filename} alt="#" />
                      </div>
                      {/* <!-- End Product slider --> */}
                    </div>
                    <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                      <div class="quickview-content">
                        <h2>{talent.talent.fullname}</h2>
                        <h3>{formatter.format(talent.talent.price)}</h3>
                        <div class="quickview-peragraph">
                          <ul>
                            <li>Gender : {talent.talent.gender}</li>
                            <li>Age : {talent.talent.age} years old</li>
                            <li>Personality : {talent.talent.personality}</li>
                            <li>Nationality : {talent.talent.nationality}</li>
                            <li>Skills :</li>
                            <ol
                              style={{ paddingLeft: "20px", paddingUp: "5px" }}
                            >
                              {talent.talent.skills.split(",").map((talent) => {
                                return <li> {talent}</li>;
                              })}
                            </ol>
                          </ul>
                        </div>
                        <div class="add-to-cart">
                          <a
                            href="#"
                            class="btn"
                            onClick={() =>
                              addItem(talent.talent.id, cart[0].id)
                            }
                          >
                            Add to cart
                          </a>
                        </div>
                        <div class="default-social">
                          <h4 class="share-now">Social Media:</h4>
                          <ul>
                            {social.map((socials, key) => {
                              return (
                                <li>
                                  <a
                                    class={
                                      socials.talent.id === talent.talent.id
                                        ? socials.platform
                                        : ""
                                    }
                                    href={
                                      socials.talent.id === talent.talent.id
                                        ? socials.account
                                        : ""
                                    }
                                  >
                                    <i
                                      class={
                                        socials.talent.id === talent.talent.id
                                          ? "fa fa-" + socials.platform
                                          : ""
                                      }
                                    ></i>
                                  </a>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                        {/* <br />
                        <h5>Comments:</h5>
                        <div className="commentSection">
                          {!comments ? (
                            <h2 style={{ fontAlign: "center" }}>No Comment</h2>
                          ) : !user ? null : (
                            <CommentSection
                              currentUser={
                                user.id && {
                                  userId: user.id,
                                  avatarUrl: user.avatar,
                                  name: user.name,
                                }
                              }
                              commentsArray={comm[talent.talentId]}
                              setComment={setComments}
                              signinUrl={signinUrl}
                              signupUrl={signupUrl}
                            />
                          )}
                        </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};
