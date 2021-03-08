import React, { useState, useEffect, useCallback } from 'react';
import '../style/OptionsBox.css';
import '../bootstrap/css/bootstrap.min.css';
import PropTypes from 'prop-types';

const Option = (props) => {

  const [buttonEnabled, setButtonEnabled] = useState(false);

  useEffect(() => {
    if (!props.firstClick) {
      setButtonEnabled(false);
    }
    if (props.last) {
      setButtonEnabled(true);
    }
  })

  const handleClick = useCallback(
    (value) => {
      if(!props.last) {
        props.handler(value);
        setButtonEnabled(!buttonEnabled);
      }
    }, [props]);

  return (
    <input data-test="option-button" id={props.data.name} type="button" className={(props.optionAvailable) ? (buttonEnabled || !props.firstClick) ? "btn btn-primary btn-md" : "btn-disabled btn btn-primary btn-md" : "btn-not-available btn btn-md"}
      value={props.data.name} onClick={() => {if(props.optionAvailable) handleClick(props.data)}} />
  );
}

const OptionsBox = (props) => {
  const title = props.box.title;
  const data = props.box.buttons;
  const relationsList = props.box.relations ? props.box.relations : {};
  const hidden = props.hidden ? props.hidden : [];
  const [nEnabled, setNEnabled] = useState(data.reduce((acc, elem) => {return acc += elem.enabled ? 1 : 0},0));
  const [type, setType] = useState(hidden.includes(title) ? "animate-fadeout" : "animate-fadein");
  const [firstClick, setFirstClick] = useState(false);
  const [clear, setClear] = useState(false);
  const [lastButton, setLastButton] = useState("");
  const [clickedList, setClickedList] = useState([]);

  useEffect(() => {
    setType(hidden.includes(title) ? "animate-fadeout" : "animate-fadein");
    setClear(props.clear);
    setNEnabled(data.reduce((acc, elem) => {return acc += elem.enabled ? 1 : 0},0));
    if(clear && firstClick) {
      props.handler({name: "<clear>"}, [], title, relationsList);
      setLastButton("");
      setClickedList([]);
      setFirstClick(false);
      setClear(false);
    }
  });

  const handleClearClick = useCallback(() => {
    if(clickedList.length > 0) {
      setLastButton("");
      setClickedList([]);
      props.handler({name: "<clear>"}, [], title, relationsList);
      if (firstClick) setFirstClick(false);
    }
  });

  const handleButtonClick = useCallback((button_data) => {
    let list = [];
    let value = button_data.name;
    // console.log("data", data);
    if((clickedList.length === 1 && clickedList.includes(value)) || nEnabled === 1) {
    } 
    else {
      if(clickedList.includes(value)) {
        list = [...clickedList].filter((item) => item !== value);
      } else {
        list = [...clickedList, value];
      }
      // console.log("list",list);
      if(list.length === 1) {
        setLastButton(list[0]);
      } else if (lastButton!=="") {
        setLastButton("");
      }
      setClickedList(list);
      props.handler(button_data, list, title, relationsList);
      if (!firstClick) setFirstClick(true);
    }
  });

  return (
    <div test={title} className={"panel-default box " + type}>

      <div className="panel-heading">
        <span className="header-title">{title}</span>
        <input onClick={handleClearClick} type="image" src={require("../images/clear_border.png")} className="cancel-button noSelect" alt="clear" />
      </div>
      <div className="panel-body">
        {data.map(item => 
            (<Option key={item.name} panelTitle={title} data={item} handler={(value) => handleButtonClick(value)} 
            firstClick={firstClick} last={item.name === lastButton} optionAvailable={item.enabled} />)
        )}
      </div>

    </div>
  );
}

// export default React.memo(OptionsBox, (prevProps, nextProps) => prevProps.type === nextProps.type);
export default OptionsBox;

OptionsBox.propTypes = {
  box: PropTypes.shape({
    title: PropTypes.string.isRequired,
    buttons: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        enabled: PropTypes.bool.isRequired,
        related: PropTypes.array,
      })
    ),
    default: PropTypes.oneOf(['hidden'])
  }).isRequired,
  clear: PropTypes.bool,
  handler: PropTypes.func,
  hidden: PropTypes.arrayOf(PropTypes.string)
};

OptionsBox.defaultProps = {
  clear: false
}