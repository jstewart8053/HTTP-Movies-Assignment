import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const initialItem = {
    id: "",
    title: "",
    director: "",
    metascore: "",

};
const UpdateForm = (props) => {
    const history = useHistory();
    const { id } = useParams(); // useParams returns an object with all the dynamic params as properties
    const [item, setItem] = useState(initialItem); // state that is controlling the form

    useEffect(() => {
        axios
            .get(`"http://localhost:5000/api/movies/itemById/${id}`)
            .then((res) => setItem(res.data))
            .catch((err) => console.log(err));
    }, [id]);

    const changeHandler = (ev) => {
        ev.persist();
        let value = ev.target.value;
        if (ev.target.name === "price") {
            value = parseInt(value, 10);
        }

        setItem({
            ...item,
            [ev.target.name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // make a PUT request to edit the item\
        axios
            .put(`http://localhost:5000/api/movies/items/${id}`, item)
            .then((res) => {
                // update items state that is in App
                // res.data ==>>> array with all items, including the updated item
                // const newItemsArr = props.items.map() // -> find the item that was updated and replace it with the updated item
                props.setItems(res.data);
                history.push(`/item-list/${id}`);
            })
            .catch((err) => console.log(err));
    };
    return (
        <div>
            <h2>Update Item</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    onChange={changeHandler}
                    placeholder="name"
                    value={item.name}
                />
                <div className="baseline" />

                <input
                    type="number"
                    name="price"
                    onChange={changeHandler}
                    placeholder="Price"
                    value={item.price}
                />
                <div className="baseline" />

                <input
                    type="string"
                    name="imageUrl"
                    onChange={changeHandler}
                    placeholder="Image"
                    value={item.imageUrl}
                />
                <div className="baseline" />

                <input
                    type="string"
                    name="description"
                    onChange={changeHandler}
                    placeholder="Description"
                    value={item.description}
                />
                <div className="baseline" />

                <input
                    type="string"
                    name="shipping"
                    onChange={changeHandler}
                    placeholder="Shipping"
                    value={item.shipping}
                />
                <div className="baseline" />

                <button className="md-button form-button">Update</button>
            </form>
        </div>
    );
};

export default UpdateForm;
