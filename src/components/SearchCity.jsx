const SearchCity = ({ onSearch }) => (
  <>
    <label htmlFor="city" className="text-gray-700 mb-3 mr-3 text-lg">
      Your city
    </label>
    <input
      type="text"
      id="city"
      placeholder="Search..."
      className="border rounded-lg px-4 py-2 text-gray-700 w-full sm:w-auto text-lg"
      onKeyDown={(e) => e.key === "Enter" && onSearch(e.target.value)}
    />
  </>
);

export default SearchCity;
