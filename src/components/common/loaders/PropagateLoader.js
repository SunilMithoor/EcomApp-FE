import { PropagateLoader } from "react-spinners";

const cssProperties = {
  display: "flex",
  justifyContent: "center", // Center horizontally
  alignItems: "center", // Center vertically
  textAlign: "center", // Center text alignment
  borderColor: "red", // Border color for the loader
};

function PropagateLoaders({ loading }) {
  return (
    <div
      className="sweet-loading"
      style={{ justifyContent: "center", alignItems: "center", padding: 10 }}
    >
      <PropagateLoader
        color="#252829" // Loader color
        loading={loading}
        cssOverride={cssProperties}
        size={15} // Size of the loader
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}

export default PropagateLoaders;
