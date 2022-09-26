import './BodyPartHighlighter.scss';
import React from 'react';
import Model from 'react-body-highlighter';
import { useNavigate } from 'react-router-dom';
import bodyParts from '../../data/bodyParts.json';

const BodyPartHighlighter = ({ bodyPart }) => {
    const navigate = useNavigate();
    const data =  [{ muscles: bodyPart.highlight }];
    
    // navigate to bodypart details page correlating with selected muscle
    const handleClick = React.useCallback(({ muscle }) => {
        const clicked = bodyParts.find(bodyPart => bodyPart.highlight.includes(muscle))
        navigate(`/explore/category/${clicked.name}`);
    }, [data]);

    return (
        <>
        <Model
            data={!bodyPart ? [{ muscles: ["front-deltoids"] }] : data}
            onClick={handleClick}
            highlightedColors={["#1945AA"]}
        />
        <Model
            type="posterior"
            data={!bodyPart ? [{ muscles: ["back-deltoids"] }] : data}
            onClick={handleClick}
            highlightedColors={["#e65a5a"]}
        />
        </>
    );
}

export default BodyPartHighlighter;