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
        navigate(`/explore/${clicked.name}`);
    }, [data]);

    return (
        <>
        <Model
            data={!bodyPart ? [{ muscles: ["front-deltoids"] }] : data}
            onClick={handleClick}
            highlightedColors={["#FFB300"]}
        />
        <Model
            type="posterior"
            data={!bodyPart ? [{ muscles: ["back-deltoids"] }] : data}
            onClick={handleClick}
            highlightedColors={["#FFB300"]}
        />
        </>
    );
}

export default BodyPartHighlighter;