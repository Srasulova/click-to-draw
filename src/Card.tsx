import React from "react";

interface CardProps {
    image: string;
}

const Card: React.FC<CardProps> = ({ image }) => {
    return <img src={image} alt="Card" style={{ width: "150px", margin: "10px" }} />;
};

export default Card;
