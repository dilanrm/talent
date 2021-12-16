import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";

import "../components/Shop/page.css";

import "react-toastify/dist/ReactToastify.css";

import { Breadcrumb } from "../components/Breadcrumb";
import { Loading } from "../components/Loading";
import { NationalityList } from "../components/Shop/NationalityList";
import { RecentPost } from "../components/Shop/RecentPost";
import { ShopByPrice } from "../components/Shop/ShopByPrice";
import { ShopItem } from "../components/Shop/ShopItem";
import { ShopModal } from "../components/Shop/ShopModal";
import { ShopSorter } from "../components/Shop/ShopSorter";
import { Route, Routes } from "react-router-dom";

toast.configure();

const client = axios.create({
  baseURL: "/",
});
const token = !JSON.parse(localStorage.getItem("user"))
  ? ""
  : JSON.parse(localStorage.getItem("user")).access_token;

export const Shop = ({ loading, lineItem, setLineItem }) => {
  const [talents, setTalents] = useState(null);
  const [items, setItems] = useState(talents);
  const [comments, setComments] = useState(null);
  // const [lineItem, setLineItem] = useState(null);
  const [social, setSocial] = useState(null);
  const [cart, setCart] = useState(null);

  const [offset, setOffset] = useState(0);
  const [perPage, setPerPage] = useState(3);
  const [pageCount, setPageCount] = useState(0);

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });

  const getLineItem = async () => {
    const response = await client.get("/line-items/", {
      headers: { access_token: token },
    });
    setLineItem(response.data);
    // console.log(lineItem);
  };

  const getTale = async () => {
    const response = await client.get("/talent-images/");
    setItems(response.data);
    const data = response.data;
    const slice = data.slice(offset, offset + perPage);
    console.log(slice, offset, offset + perPage);
    setTalents(slice);
    setPageCount(Math.ceil(data.length / perPage));
    console.log(talents);
  };

  const getSocial = async () => {
    const response = await client.get("/talent-socials/");
    setSocial(response.data);
  };

  const getComments = async () => {
    const response = await client.get("/talent-comments/");
    setComments(response.data);
  };

  const getCart = async () => {
    const response = await client.get("/carts/", {
      headers: { access_token: token },
    });
    setCart(response.data);
    console.log(cart);
  };

  const addItem = async (talentId, cartId) => {
    const response = await client.post(
      "/line-items/add",
      { days: 1, status: "booking", talentId, cartId },
      {
        headers: { access_token: token },
      },
    );

    if (response) {
      toast("item add success", { type: "success" });
      getLineItem();
    } else {
      toast("Something went wrong", { type: "error" });
    }
  };

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setOffset((selectedPage * perPage) % items.length);
    console.log(talents.length);
    getTale();
  };

  const onChangePage = (e) => {
    setPerPage(e.target.value);
    setOffset(0);
    setPageCount(Math.ceil(items.length / perPage));
  };

  useEffect(() => {
    getTale();
    getSocial();
    getComments();
    getCart();
  }, [offset, perPage, pageCount]);

  if (!talents) return <Loading />;

  return (
    <>
      {!talents ? (
        <Loading />
      ) : (
        <div>
          <Breadcrumb />
          <section class="product-area shop-sidebar shop section">
            <div class="container">
              <div class="row">
                <div class="col-lg-3 col-md-5 col-12">
                  <div class="shop-sidebar">
                    {/* <!-- Single Widget --> */}
                    <div class="single-widget category">
                      <h3 class="title">Nationality</h3>
                      <NationalityList />
                    </div>
                    {/* <!--/ End Single Widget --> */}
                    {/* <!-- Shop By Price --> */}
                    <div class="single-widget range">
                      {/* <h3 class="title">Shop by Price</h3> */}
                      <h3 class="title">Gender</h3>
                      <ShopByPrice />
                    </div>
                    {/* <!--/ End Shop By Price --> */}
                    {/* <!-- Single Widget --> */}
                    {/* <div class="single-widget recent-post">
                      <h3 class="title">Recent post</h3>
                      {/* <!-- Single Post --> */}
                    {/* <RecentPost talents={talents} formatter={formatter} /> */}
                    {/* <!-- End Single Post --> */}
                    {/* </div> */}
                    {/* <!--/ End Single Widget --> */}
                  </div>
                </div>
                <div class="col-lg-9 col-md-7 col-12">
                  <ShopSorter onChangePage={onChangePage} />
                  <div class="row">
                    <ShopItem
                      talents={talents}
                      formatter={formatter}
                      addItem={addItem}
                      cart={cart}
                      pageCount={pageCount}
                      onPageChange={handlePageClick}
                      offset={offset}
                      perPage={perPage}
                    />
                  </div>
                </div>
                <ReactPaginate
                  previousLabel={"prev"}
                  nextLabel={"next"}
                  breakLabel={"..."}
                  breakClassName={"break-me"}
                  pageCount={pageCount}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  onPageChange={handlePageClick}
                  containerClassName={"pagination"}
                  subContainerClassName={"pages pagination"}
                  activeClassName={"active"}
                />
              </div>
            </div>
          </section>
          {/* <!-- Modal --> */}
          <ShopModal
            talents={items}
            social={social}
            formatter={formatter}
            addItem={addItem}
            cart={cart}
            comments={comments}
            setComments={setComments}
          />
          {/* <!-- Modal end --> */}
        </div>
      )}
    </>
  );
};
