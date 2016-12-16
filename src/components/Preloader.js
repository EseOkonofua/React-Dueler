import React, { Component } from 'react'
export default class Preloader extends Component{
  constructor(){
    super();
    this.state = {
      loaded: true,
      assets: Number.POSITIVE_INFINITY,
      loadedAssets: 0
    }

    this.assets = {
      images: []

    }
  }

  loadImages(){

    this.props.images.forEach(image =>{
      var img = new Image();
      img.src = image;
      img.onload = ()=>{
        this.assets.images.push(img);
        this.setState({loadedAssets:++this.state.loadedAssets});
      }
    })

  }

  componentDidMount(){
      let assets = this.props.images.length ;
      this.setState({assets});

      this.loadImages();
  }

  render(){
    let loadedPercent = (this.state.loadedAssets/this.state.assets)*100;

    if(loadedPercent === 100) this.props.onLoad(this.assets);

    return (
      <span>
      {
        (loadedPercent !== 100) ?
        <div id="preload">
          <h1>Loading...</h1>
          <h3>{`${loadedPercent}%`}</h3>
        </div> : this.props.children
      }
      </span>
    )

  }


}

Preloader.propTypes = {
  images: React.PropTypes.arrayOf(React.PropTypes.string),
  sounds: React.PropTypes.arrayOf(React.PropTypes.string),
  videos: React.PropTypes.arrayOf(React.PropTypes.string),
  onLoad: React.PropTypes.func
}
