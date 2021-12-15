import React,{useEffect} from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

import { useSelector,useDispatch } from "react-redux";
import { getSelectedFilter } from '../../redux/actions';

import { useNavigate  } from 'react-router-dom';

export default function TemporaryDrawer() {

  const FiltersData = useSelector((state) => state.Filters);
  const dispatch = useDispatch();
  
  const [state, setState] = React.useState({
    bottom: false
  });

  let navigate = useNavigate();


  //drawer onClick set selectedFiler
  function storageHandle(e) {
    if(e.target.getAttribute("data-testid") === "ArrowRightIcon" || e.target.getAttribute("role") === "button" ){
      dispatch(getSelectedFilter(e.target.id))
      e.preventDefault();
      navigate(e.target.id)
      
    } else {
      dispatch(getSelectedFilter(e.target.innerHTML))
      e.preventDefault();
      navigate(e.target.innerHTML)
    }
    
  }

  function handleClick(e) {
    e.preventDefault();
    navigate("/create")
    
  }

  
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
     
      <List>

        {FiltersData.map((text, index) => (
          <ListItem  onClick={storageHandle} button id={text.name}  key={text.name}>
            <ArrowRightIcon id={text.name}/>
            <ListItemText  id={text.name} primary={text.name} />
          </ListItem>
        ))}
        
        <ListItem button onClick={handleClick} key={"צור מסנן חדש"}>
            <ListItemIcon>
            </ListItemIcon>
            <ListItemText primary={"צור מסנן חדש"} />
          </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      {['bottom'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>מסננים</Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
