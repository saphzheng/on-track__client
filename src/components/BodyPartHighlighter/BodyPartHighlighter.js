import './BodyPartHighlighter.scss';
import React from 'react';
import Model from 'react-body-highlighter';
import { useNavigate } from 'react-router-dom';
import bodyParts from '../../data/bodyParts.json';

const BodyPartHighlighter = ({ bodyPart }) => {
    const navigate = useNavigate();
    let frontData =  [{ muscles: bodyPart.highlight }];
    let backData =  [{ muscles: bodyPart.highlight }];

    if (bodyPart?.name === "View All") {
        frontData = [{ muscles: ["back-deltoids"] }];
        backData = [{ muscles: ["front-deltoids"] }];
    }
    
    // navigate to bodypart details page correlating with selected muscle
    const handleClick = React.useCallback(({ muscle }) => {
        const clicked = bodyParts.find(bodyPart => bodyPart.highlight.includes(muscle))
        navigate(`/explore/${clicked.name}`);
    }, [frontData, backData]);

    return (
        <>
        <Model
            data={!bodyPart ? [{ muscles: ["back-deltoids"] }] : frontData}
            onClick={handleClick}
            highlightedColors={["#FFB300"]}
        />
        <Model
            type="posterior"
            data={!bodyPart ? [{ muscles: ["front-deltoids"] }] : backData}
            onClick={handleClick}
            highlightedColors={["#FFB300"]}
        />
        </>
    );
}

export default BodyPartHighlighter;