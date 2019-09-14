import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import "tabler-react/dist/Tabler.css";
import { Page, Card } from "tabler-react";

import SelectPicker from "../presentations/SelectPicker";
import ProductsList from "../presentations/ProductsList";
import Modal from "../presentations/Modal";

import {
  loadCategories,
  loadLocations,
  loadProducts
} from "../../store/actions";
import ProductDetails from "../presentations/ProductDetails";

export default props => {
  const { categories, locations, products } = useSelector(state => state);
  const [selectedLocation, selectLocation] = useState();
  const [selectedCategory, selectCategory] = useState();
  const [selectedProduct, selectProduct] = useState();
  const viewDetails = product => {
    selectProduct(product);
  };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadCategories());
    dispatch(loadLocations());
    dispatch(loadProducts());
  }, [categories, locations, products]);

  if (!products) {
    return <div />;
  }

  console.log({ selectedProduct, selectedCategory, selectedLocation });

  return (
    <Page>
      <Modal
        {...{
          show: !!selectedProduct,
          title: selectedProduct && selectedProduct.name,
          bodyContent: selectedProduct ? (
            <ProductDetails
              product={selectedProduct}
              category={categories.find(c => c.id === selectedCategory)}
              location={locations.find(l => l.id === selectedLocation)}
            />
          ) : null,
          handleClose: () => selectProduct(null)
          // actions: []
        }}
      />

      <Card>
        <Card.Header>
          <span>Find Tools &amp; Equipments</span>
        </Card.Header>
        <Card.Body>
          <SelectPicker
            selectLabel="Location"
            selectedValue={selectedLocation}
            handleChange={selectLocation}
            data={locations.map(l => ({ ...l, key: l.id }))}
          />
        </Card.Body>
        <Card.Body>
          <SelectPicker
            selectLabel="Category"
            selectedValue={selectedCategory}
            handleChange={selectCategory}
            data={categories.map(l => ({ ...l, key: l.id }))}
            display={!!selectedLocation}
          />
        </Card.Body>
        <Card.Body>
          {!!selectedCategory ? (
            <ProductsList
              location={selectedLocation}
              category={selectedCategory}
              viewDetails={viewDetails}
              data={products}
            />
          ) : null}
        </Card.Body>
      </Card>
    </Page>
  );
};
