import React, {useState, useEffect} from "react";
import "./stylesheet.css";
import { InputGroup, FormControl, Tooltip, OverlayTrigger } from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faSearch} from "@fortawesome/free-solid-svg-icons"

export const SearchBar = (props) => {
    const [value, setValue] = useState("")
    
    useEffect(() => {
        props.callback(value);
    }, [value])

    const doSearch = event => {
        setValue(event.currentTarget.value)
    }

    return (
        <div className="searchBar">
            <InputGroup size="lg" className="svgShadow">
            <InputGroup.Prepend>
                <OverlayTrigger placement="top"
                    overlay={<Tooltip className="svgShadow">Please enter a movie name!</Tooltip>}
                >
                <InputGroup.Text id="inputGroup-sizing-lg">
                    <FontAwesomeIcon icon={faSearch}/>
                </InputGroup.Text>
                </OverlayTrigger>
            </InputGroup.Prepend>
            <FormControl 
                type="text"
                aria-label="Large" 
                aria-describedby="inputGroup-sizing-lg"
                placeholder="Search"
                onChange={doSearch}
                value={value}
            />
            </InputGroup>
        </div>
    )
}