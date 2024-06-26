import "./SearchPage.css";
import Search from "../../components/Search/Search";
import FilterButton from "../../components/FilterButton/FilterButton";
import Sort from "../../components/Sort/Sort";
import RenderProducts from "../../components/RenderProducts/RenderProducts";
import Navbar from "../../components/Navbar/Navbar";
import FilterPopup from "../../components/FilterPopup/FilterPopup";
import {
  togglePopupContext,
  userInputContext,
  filteredDataContext,
  fetchProductsContext,
  catValContext,
  darkModeContext,
  priceValContext,
  brandValContext,
} from "../../context/Context";
import { useContext, useEffect, useState } from "react";
import BackButton from "../../components/BackButton/BackButton";
import BackToTopBtn from "../../components/BackToTopBtn/BackToTopBtn";

const SearchPage = () => {
  // Import Context to Toggle Popup
  const { togglePopup } = useContext(togglePopupContext);

  // Import User Input from Global Context
  const { userInput } = useContext(userInputContext);

  // Import filtered Data from Global Context
  const { filteredData, setFilteredData } = useContext(filteredDataContext);

  // Import Global Product Fetch
  const { productsData } = useContext(fetchProductsContext);

  // State for Categories Buttons
  const { catVal, setCatVal } = useContext(catValContext);

  // State for Price Buttons
  const { priceVal, setPriceVal } = useContext(priceValContext);

  // State for Brand Buttons
  const { brandsVal, setBrandsVal } = useContext(brandValContext);

  // State for Dark Mode from Context
  const { darkMode } = useContext(darkModeContext);

  // Filter all products
  useEffect(() => {
    let filter = productsData?.products?.filter((item) => {
      let finalPriceVal = "";

      if (priceVal === "20" && catVal === "" && brandsVal === "") {
        finalPriceVal = "20";
        return item.price > 0 && item.price <= finalPriceVal;
      } else if (priceVal === "50" && catVal === "" && brandsVal === "") {
        finalPriceVal = "50";
        return item.price > 20.01 && item.price <= finalPriceVal;
      } else if (priceVal === "100" && catVal === "" && brandsVal === "") {
        finalPriceVal = "100";
        return item.price > 50.01 && item.price <= finalPriceVal;
      } else if (priceVal === "100.01" && catVal === "" && brandsVal === "") {
        finalPriceVal = "100.01";
        return item.price > 100.01;
      } else if (
        catVal === item.category &&
        priceVal === "" &&
        brandsVal === ""
      ) {
        return item.category;
      } else if (brandsVal === item.brand && priceVal === "" && catVal === "") {
        return item.brand;
      } else if (
        brandsVal === item.brand &&
        catVal === item.category &&
        priceVal === ""
      ) {
        return item.brand && item.category;
      } else if (
        item.category === catVal &&
        brandsVal === "" &&
        priceVal === "20"
      ) {
        finalPriceVal = "20";
        return item.category && item.price > 0 && item.price <= finalPriceVal;
      } else if (
        item.category === catVal &&
        brandsVal === "" &&
        priceVal === "50"
      ) {
        finalPriceVal = "50";
        return (
          item.category && item.price > 20.01 && item.price <= finalPriceVal
        );
      } else if (
        item.category === catVal &&
        brandsVal === "" &&
        priceVal === "100"
      ) {
        finalPriceVal = "100";
        return (
          item.category && item.price > 50.01 && item.price <= finalPriceVal
        );
      } else if (
        item.category === catVal &&
        brandsVal === "" &&
        priceVal === "100.01"
      ) {
        finalPriceVal = "100.01";
        return item.category && item.price > 100.01;
      } else if (
        item.brand === brandsVal &&
        catVal === "" &&
        priceVal === "20"
      ) {
        finalPriceVal = "20";
        return item.brand && item.price > 0 && item.price <= finalPriceVal;
      } else if (
        item.brand === brandsVal &&
        catVal === "" &&
        priceVal === "50"
      ) {
        finalPriceVal = "50";
        return item.brand && item.price > 20.01 && item.price <= finalPriceVal;
      } else if (
        item.brand === brandsVal &&
        catVal === "" &&
        priceVal === "100"
      ) {
        finalPriceVal = "100";
        return item.brand && item.price > 50.01 && item.price <= finalPriceVal;
      } else if (
        item.brand === brandsVal &&
        catVal === "" &&
        priceVal === "100.01"
      ) {
        finalPriceVal = "100.01";
        return item.brand && item.price > 100.01;
      } else if (
        item.brand === brandsVal &&
        catVal === item.category &&
        priceVal === "20"
      ) {
        finalPriceVal = "20";
        return (
          item.brand &&
          item.category &&
          item.price > 0 &&
          item.price <= finalPriceVal
        );
      } else if (
        item.brand === brandsVal &&
        catVal === item.category &&
        priceVal === "50"
      ) {
        finalPriceVal = "50";
        return (
          item.brand &&
          item.category &&
          item.price > 20.01 &&
          item.price <= finalPriceVal
        );
      } else if (
        item.brand === brandsVal &&
        catVal === item.category &&
        priceVal === "100"
      ) {
        finalPriceVal = "100";
        return (
          item.brand &&
          item.category &&
          item.price > 100.01 &&
          item.price <= finalPriceVal
        );
      } else if (
        item.brand === brandsVal &&
        catVal === item.category &&
        priceVal === "100.01"
      ) {
        finalPriceVal = "100.01";
        return item.brand && item.category && item.price > 100.01;
      }
    });

    if (filter.length === 0 && (catVal || priceVal || brandsVal)) {
      filter = ["noResult"];
    }

    // (catVall || priceVal || brandsVal) => Prüft, ob mindestens eine der Variablen einen Wert hat, der nicht gleich einem leeren String ist. Einen Wert erhalten sie, wenn sie im Popup ausgewählt werden und die API auch einen passenden Wert zurückgibt.
    setFilteredData(filter);
  }, [catVal, priceVal, brandsVal]);

  // ! Filter Product Data by User Input
  useEffect(() => {
    // search all products data:
    if (filteredData.length === 0 && userInput.length >= 1) {
      setFilteredData(
        productsData?.products?.filter((item) => {
          return item.title.toLowerCase().includes(userInput.toLowerCase());
        })
      );
      // search filtered Data:
    } else if (
      filteredData.length > 0 &&
      !filteredData.includes("noResult") &&
      userInput.length >= 1
    ) {
      const filter = filteredData?.filter((item) =>
        item.title.toLowerCase().includes(userInput.toLowerCase())
      );
      if (filter.length === 0) {
        return setFilteredData(["noResult"]);
      } else {
        return setFilteredData(filter);
      }
    }
  }, [userInput, productsData]);

  return (
    <section className="searchpage">
      {togglePopup ? (
        <FilterPopup />
      ) : (
        <main>
          <div className="search-filter">
            <Search />
            <FilterButton />
          </div>
          <Sort />
          <RenderProducts />
          <BackToTopBtn />
          <Navbar />
        </main>
      )}
    </section>
  );
};

export default SearchPage;
