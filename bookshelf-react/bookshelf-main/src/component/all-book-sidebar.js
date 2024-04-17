import { useAllContext } from "./context/context";
import { useFilterContext } from "./context/filter_context";
import FormatPrice from "./format-price";

const AllBookSidebar = () => {
  const { allBooks } = useAllContext();

  // TO GET THE UNIQUE DATA OF EACH FIELDS
  const getUniqueData = (data, property) => {
    let newVal = data.map((curElem) => {
      return curElem[property];
    });
    return (newVal = ["all", ...new Set(newVal)]);
  };

  // WE NEED UNIQUE DATA
  const categoryData = getUniqueData(allBooks, "category");
  const authorData = getUniqueData(allBooks, "author");

  const {
    filters: { text, category, price, maxPrice, minPrice },
    updateFilterValue,
  } = useFilterContext();
  return (
    <div className="filter">
      <div className="filter__item">
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            name="text"
            placeholder="Search"
            value={text}
            onChange={updateFilterValue}
          />
        </form>
      </div>
      <div className="filter__item">
        <h3 className="filter--title">Category</h3>
        <div className="filter__item--category">
          {categoryData.map((curElem, i) => {
            return (
              <button
                key={i}
                type="button"
                name="category"
                value={curElem}
                className={curElem === category ? "active" : ""}
                onClick={updateFilterValue}
              >
                {curElem}
              </button>
            );
          })}
        </div>
      </div>
      <div className="filter__item">
        <h3 className="filter--title">author</h3>
        <form action="#">
          <select name="author" id="author" onClick={updateFilterValue}>
            {authorData.map((curElem, index) => {
              return (
                <option key={index} value={curElem} name="author">
                  {curElem}
                </option>
              );
            })}
          </select>
        </form>
      </div>
      <div className="filter__item">
        <h3 className="filter--title">Price</h3>
        <p className="amount">
          <FormatPrice price={price} />
        </p>
        <input
          type="range"
          name="price"
          className="price"
          min={minPrice}
          max={maxPrice}
          value={price}
          onChange={updateFilterValue}
        />
      </div>
    </div>
  );
};

export default AllBookSidebar;
