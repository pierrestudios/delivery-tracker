import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import "tabler-react/dist/Tabler.css";
import { Page, Card } from "tabler-react";

import SelectPicker from "../presentations/SelectPicker";
import ProductsList from "../presentations/ProductsList";
import Modal from "../presentations/Modal";

import {
  loadReservations,
  loadCategories,
  loadLocations,
  loadProducts,
} from "../../store/actions";
import ProductDetails from "../containers/ProductDetails";
import Loading from "../presentations/Loading";

export default ({ match, history: { pathname } }) => {
  const { locationId, categoryId } = match.params;
  const { categories, locations, products, reservations, userAuth } =
    useSelector((state) => state);
  const { token: userToken, loaded: authLoaded } = userAuth;
  const [selectedLocationId, selectLocationId] = useState(locationId);
  const [selectedCategoryId, selectCategoryId] = useState(categoryId);
  const [selectedProduct, selectProduct] = useState();
  const viewDetails = (product) => {
    selectProduct(product);
  };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadCategories());
    dispatch(loadLocations());
    dispatch(loadProducts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories, locations, products]);

  useEffect(() => {
    if (authLoaded && !!userToken) {
      dispatch(loadReservations());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reservations, authLoaded, userToken]);

  useEffect(() => {
    if (window.scroll) {
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    } else {
      // fallback for older browsers
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  if (!products || !products.length) {
    return <Loading />;
  }

  const filteredProducts = products.filter(
    (p) => selectedCategoryId === p.category
  );

  return (
    <Page className="container page-height">
      <Modal
        {...{
          show: !!selectedProduct,
          title: "Tools Details",
          bodyContent: !!selectedProduct ? (
            <ProductDetails
              product={selectedProduct}
              category={categories.find((c) => c.id === selectedCategoryId)}
              location={locations.find((l) => l.id === selectedLocationId)}
            />
          ) : null,
          handleClose: () => selectProduct(null),
        }}
      />

      <Card>
        <Card.Header>
          <span>Find Tools &amp; Equipments</span>
        </Card.Header>
        <Card.Body>
          <SelectPicker
            selectLabel="Location"
            selectedValue={selectedLocationId}
            handleChange={selectLocationId}
            data={locations}
          />

          <SelectPicker
            selectLabel="Category"
            selectedValue={selectedCategoryId}
            handleChange={selectCategoryId}
            data={categories}
            display={!!selectedLocationId}
          />

          {!!selectedCategoryId ? (
            <ProductsList
              location={selectedLocationId}
              category={selectedCategoryId}
              viewDetails={viewDetails}
              data={filteredProducts}
            />
          ) : null}
        </Card.Body>
      </Card>
    </Page>
  );
};
