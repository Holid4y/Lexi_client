import React from "react";


const Skeleton = () => {
  return (
    <div>
      <div>
        <div class="card text-end mb-4 w-100 bg-card-dark">
            <div class="card-body">
                <h5 class="card-title text-start mb-3 author w-100"></h5>
                <div class="card-text card-text-lr">
                    <span class="author w-50"></span>
                </div>
            </div>
        </div>
        <div class="card text-end mb-4 w-100 bg-card-dark">
            <div class="card-body">
                <h5 class="card-title text-start mb-3 author w-100"></h5>
                <div class="card-text card-text-lr">
                    <span class="author w-50"></span>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Skeleton;
