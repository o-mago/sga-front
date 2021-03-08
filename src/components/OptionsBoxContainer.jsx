import React, { useState, useEffect, useCallback } from 'react';
import OptionsBox from './OptionsBox.jsx'
import '../style/OptionsBoxContainer.css'
import PropTypes from 'prop-types';

const OptionsBoxContainer = (props) => {
  const [data, setData] = useState(props.data);
  
  let hidden_list = data.reduce((acc, curr) => {
    if (curr.default === "hidden") {
      acc.push(curr.title);
    }
    return acc;
  }, []);
  const [hidden, setHidden] = useState(hidden_list);

  useEffect(() => {
    setData(props.data);
  }, [props]);

  const handler = useCallback(
    (button_data, clickedList, title, relationsList) => {
      if (relationsList && relationsList.hasOwnProperty(button_data.name)) {
        let relations = relationsList[button_data.name];
        // console.log("related");
        if (relations.filter(x => hidden.includes(x)).length !== 0) {
          setHidden(hidden.filter(item => !relations.includes(item)));
        } else {
          setHidden([...hidden, ...relations]);
        }
      } else if (button_data.name === "<clear>") {
        let boxes_to_clear = [];
        Object.keys(relationsList).forEach((key) => boxes_to_clear.push(...relationsList[key]));
        console.log("boxes_to_clear", boxes_to_clear);
        setHidden([...hidden, ...boxes_to_clear]);
      }
      // console.log(hidden);
      props.handler(button_data.name, title);
    }, [hidden]);

  return (
    <div id="boxes" className="animate-fadein">
      {
        data.map(obj =>
          (<OptionsBox key={obj.title} box={obj} handler={handler} clear={hidden.includes(obj.title) ? true : false} hidden={hidden} 
          clear={(props.clear || hidden.includes(obj.title))} />)
        )
      }
    </div>
  );
};

export default OptionsBoxContainer;

OptionsBoxContainer.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      buttons: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          enabled: PropTypes.bool.isRequired,
          related: PropTypes.array,
        })
      ),
      default: PropTypes.oneOf(['hidden'])
    }),
  ).isRequired
};