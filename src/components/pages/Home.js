import React from "react";
import "tabler-react/dist/Tabler.css";
import { Page, GalleryCard } from "tabler-react";
import { Link } from "react-router-dom";

import Logo from "../presentations/Logo";

export default props => {
  const selectedLocationId = "5d10209ebbde278fa3b797c1";
  const selectedProducts = [
    {
      name: "4.0 CFM Air Compressor",
      category: {
        name: "Air Compressors & Air Tools",
        id: "5d101db988b1998f4b5a9858"
      },
      image:
        "https://delivery-tracker.s3.amazonaws.com/products/Product-5d111bcd10109ba08758f3b0/product-image-1563237341452.jpg",
      id: "5d111bcd10109ba08758f3b0"
    },
    {
      name: "2″ Trash Pump Gasoline",
      category: {
        name: "Pumps & Accessories",
        id: "5d101db988b1998f4b5a9861"
      },
      image:
        "https://delivery-tracker.s3.amazonaws.com/products/Product-5d111e7010109ba08758f6e4/product-image-1563237833013.jpg",
      id: "5d111e7010109ba08758f6e4"
    },
    {
      name: "6′ x 2 1/2′ Narrow Scaffold Set",
      category: {
        name: "Scaffolding & Ladders",
        id: "5d101db988b1998f4b5a9863"
      },
      image:
        "https://delivery-tracker.s3.amazonaws.com/products/Product-5d111ec710109ba08758f73c/product-image-1563237894271.jpg",
      id: "5d111ec710109ba08758f73c"
    }
  ];
  return (
    <Page>
      <header className="masthead">
        <div className="container">
          <div className="intro-text">
            <div className="intro-lead-in">
              Welcome To <Logo />
            </div>
            <div className="intro-heading">EQUIPMENT &amp; TOOL RENTAL</div>
            <Link className="btn btn-primary btn-xl" to="/find-tools">
              Reserve Now!
            </Link>
          </div>
        </div>
      </header>

      <section className="page-section" id="services">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <h2 className="section-heading text-uppercase">
                Popular Categories
              </h2>
              <h3 className="section-subheading text-muted">
                Choose from our most popular categories
              </h3>
            </div>
          </div>
          <div className="row text-center">
            {selectedProducts.map(
              ({
                name,
                category: { name: categoryName, id: categoryId },
                image,
                id
              }) => (
                <div className="col-md-4">
                  <h4 className="service-heading">{categoryName}</h4>
                  <GalleryCard.Image src={image} />
                  <p className="text-muted">
                    <strong>{name}</strong>
                  </p>
                  <Link className="btn btn-primary" to="/find-tools">
                    More Details
                  </Link>
                </div>
              )
            )}
          </div>
        </div>
      </section>
    </Page>
  );
};
