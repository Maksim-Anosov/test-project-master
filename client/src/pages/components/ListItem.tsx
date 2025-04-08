import React from "react";
import { Link } from "react-router-dom";

const ListItem: React.FC<any> = ({
  id,
  name,
  description,
  isactive,
}) => {
  return (
    <li className={isactive == id ? "list-item active" : "list-item"}>

      <Link to={`/${id}`}>
        <div className={"list-item-actions"}>
          <div>
            ID: <b>{id}</b>
          </div>

        </div>
        <div>{name}</div>
        <div className={"list-item__description"}>{description}</div>
      </Link>
      <button disabled={isactive == id} data-id={id}>{isactive == id ? "Active" : "Set Active"}</button>
    </li>
  );
};

export default ListItem;
