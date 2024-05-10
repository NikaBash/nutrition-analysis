export const MyNutrition = ({ label, quantity, unit }) => {
    return (
      <div className="par">
        <p><b>{label}</b></p>
        <div className="quantity-unit">
          <p>{quantity}</p>
          <p>{unit}</p>
        </div>
      </div>
    )
  }
  