import React, {Component} from 'react'
import { Dropdown } from 'semantic-ui-react'


class NewBountyTagDropdown extends Component{
  constructor(props){
    super(props)
    console.log(props)
    this.state = {
      options: [],
      tags: props.tags,
    }
  }

  componentDidMount(){
    let newOptions = [];
    this.state.tags.forEach(tag => {
      newOptions.push({
        key: tag.name,
        text: tag.name,
        value: tag.name,
      })
    })
    this.setState({
      options: newOptions,
    })
  }

  render(){
    return(
      <Dropdown
        onChange={this.props.changeHandler}
        style={{marginTop: 20}}
        placeholder='Tags'
        fluid
        multiple
        search
        selection
        options={this.state.options}
      />
    )
  }
}

export default NewBountyTagDropdown
