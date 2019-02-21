import React, { Component } from 'react';
import './App.css';
import VerticalMenu from './Components/VerticalMenu';
import BabyFoodForm from './Components/BabyFoodForm';
import BabyFoodOutput from './Components/BabyFoodOutput';
import BabyOutputForm from './Components/BabyOutputForm'
import { Checkbox } from 'semantic-ui-react';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      food: {
        title: 'Food',
        data: [],
      },
      output: {
        title: 'Output',
        data: [],
      },
      /* sleep: {
        title: 'Sleep',
        data: []
      }, */
      type: 'Food',
    }

    this.babyFood = this.babyFood.bind(this);
    this.changeBabyForm = this.changeBabyForm.bind(this);
  }

  /* Menu changes */
  changeBabyForm = (menu) => {
    this.setState({
      type: menu
    })
  }

  /* Taking information from BabyFoodForm and saving into the App state */
  babyFood = (babyFood) => {
    this.setState((prevState) => ({
      food: {
        ...this.state.food,
        data: [babyFood, ...this.state.food.data]
      }
    }))
  }

  /* Receives information from BabyOutputForm and saves it into the App state */
  babyOutput = (babyOutput) => {
    this.setState((prevState)=> ({
      output : {
        ...this.state.output,
        data: [babyOutput, ...this.state.output.data]
      }
    }))
  }

  /* With this the user can update the notes on table below */
  updateBabyFood = (editBabyFood) => {
    const { food } = this.state;
    this.setState(prevState => ({
      food: {
       ...food,
       data: food.data.map(item => {
         if (item.id === editBabyFood.id) {
           return {
            id: editBabyFood.id,
            breast: editBabyFood.breast,
            duration: editBabyFood.duration,
            quantity: editBabyFood.quantity,
            datetime: editBabyFood.datetime,
            text: editBabyFood.text,
            disabledFormula: editBabyFood.disabledFormula,
           }
         } else {
           return item
         }
       })  
      }
    }))
    console.log(food);    
  }

  /* Delete the entry that the user selected */
  entryDelete = (id) => {
    const { food } = this.state; 
    this.setState(prevState => ({
      food: {
        ...food,
        data: food.data.filter(entry => entry.id !== id)
      }
    }))
  }

  render() {

    const { type, food } = this.state;

    return (
      <div className="flexContainer flexColumn fullHeight ">
        <nav className="flexContainer blueBackground">
          <ul className="nav flexItem flexStart">
            <li><i className="em em-baby"></i>babyPeanut <i className="em em-peanuts"></i> app</li>
          </ul>
        </nav>
        <div className="flexContainer flexItem">
          <main className="flexItem main flexContainer flexColumn ">
            <div className="menuTitle" >
              {type === 'Food' ?
                <h3> <span className="highlight"> Food </span> for your <i className="em em-baby"></i> </h3>
                :
                type === 'Output' ?
                  <h3> Your <span className="highlight">Baby</span>  <i className="em em-hankey"></i> </h3>
                  :
                    null}

            </div>
            <div className="babyInput ">
              {type === 'Food' ?
                <BabyFoodForm babyFood={this.babyFood} onEdit={this.updateBabyFood}/>
                :
                type === 'Output' ?
                  <BabyOutputForm babyOutput={this.babyOutput}/>
                  :
                  null
              }
            </div>
            <div className="babyOutput flexItem">
              {type === 'Food' ?
                <BabyFoodOutput food={food} entryDelete={this.entryDelete} />
                :
                null
              }
            </div>
          </main>
          <aside className="sidebar sidebarLeft">
            <h2 className='menu'><i className="em em-paperclip"></i> menu</h2>
            <VerticalMenu menu={this.changeBabyForm} />
          </aside>
        </div>
        <footer className="flexContainer flexCenter blueBackground whiteText height50 footer">&copy; babyPeanut </footer>
      </div >
    );
  }
}

export default App;
