import React, { useState } from "react";

export const ShopModal = ({ talents, formatter, social, addItem, cart }) => {
  const [modTalent, setModTalent] = useState(talents);

  const getBirthddate = (date) => {
    return new Date(date).getDate();
  };
  // console.log(talents);

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
                          <a href="#" class="btn" onClick={()=>addItem(talent.talent.id,cart[0].id)}>
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
                                    class={socials.talent.id === talent.talent.id ? socials.platform : ""}
                                    href={socials.talent.id === talent.talent.id ? socials.account : ""}
                                  >
                                    <i class={socials.talent.id === talent.talent.id ? "fa fa-" + socials.platform : ""}></i>
                                  </a>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
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
