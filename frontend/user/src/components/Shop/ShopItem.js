import React, {useState} from "react";

export const ShopItem = ({ talents, formatter, addItem, cart }) => {
  const [talentList,setTalentList] = useState(talents);

  if(!talentList) setTalentList(talents)
  return (
    <> 
      {talentList.map((talent, key) => {
        return (
          <div class="col-lg-4 col-md-6 col-12">
            <div class="single-product">
              <div class="product-img">
                <a
                  data-toggle="modal"
                  data-target={"#theModal-" + talent.talent.id}
                  title="Quick View"
                  href="#"
                >
                  <img class="default-img" src={talent.filename} alt="#" />
                  <img class="hover-img" src={talent.filename} alt="#" />
                </a>
                <div class="button-head">
                  <div class="product-action">
                    <a
                      data-toggle="modal"
                      data-target={"#theModal-" + talent.talent.id}
                      title="Quick View"
                      href="#"
                    >
                      <i class=" ti-eye"></i>
                      <span>Quick Shop</span>
                    </a>
                  </div>
                  <div class="product-action-2">
                    <a title="Add to cart" href="#" onClick={()=>addItem(talent.talent.id,cart[0].id)}>
                      Add to cart
                    </a>
                  </div>
                </div>
              </div>
              <div class="product-content">
                <h3>
                  <a
                    data-toggle="modal"
                    data-target={"#theModal-" + talent.talent.id}
                    title="Quick View"
                    href="#"
                  >
                    {talent.talent.fullname}
                  </a>
                </h3>
                <div class="product-price">
                  <span>{formatter.format(talent.talent.price)}</span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};
