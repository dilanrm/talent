import React, { useState } from "react";

export const RecentPost = ({ talents, formatter }) => {
  const [recTalent, setRecTalent] = useState(talents);

  recTalent.sort(function (a, b) {
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    return new Date(b.talent.updatedAt) - new Date(a.talent.updatedAt);
  });

  // setRecTalent(recTalent.sort(sortObjects));
  // console.log(recTalent);

  if (!recTalent) return null;

  return (
    <>
      {recTalent.slice(0,3).map((talent, key) => {
        return (
          <div class="single-post first">
            <div class="image">
              <img src={talent.filename} alt="#" />
            </div>
            <div class="content">
              <h5>
              <a
                  data-toggle="modal"
                  data-target={"#theModal-"+talent.talent.id}
                  title="Quick View"
                  href="#"
                >
                  {talent.talent.fullname}
                  </a>
              </h5>
              <p class="price">{formatter.format(talent.talent.price)}</p>
            </div>
          </div>
        );
      })}
    </>
  );
};
