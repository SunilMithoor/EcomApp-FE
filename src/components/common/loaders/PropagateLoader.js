import { PropagateLoader } from "react-spinners";

const cssProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  borderColor: "red",
};

function PropagateLoaders({ loading }) {
  return (
    <div className="sweet-loading" style={cssProperties}>
      <PropagateLoader
        color="#252829"
        loading={loading}
        size={15}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}

export default PropagateLoaders;
