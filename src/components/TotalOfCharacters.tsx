import React from "react";

type Props = {
  total: () => number;
};

const TotalOfCharacters = ({ total }: Props) => (
  <span style={{ color: "cyan", margin: "0 1rem" }}>{total}</span>
);

export default TotalOfCharacters;
