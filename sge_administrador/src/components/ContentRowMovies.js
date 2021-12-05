import React from 'react';
import SmallCard from './SmallCard';

let becariosInDB = {
    title: 'Becarios',
    color: 'primary', 
    cuantity: 21,
    
    icon:'fa-user-check'
    
}

let equiposInDB = {
    title:' Equipos', 
    color:'success', 
    cuantity: '79',
    icon:'fa-award'
}

let prestamosInDB = {
    title:'Préstamos' ,
    color:'warning',
    cuantity:'49',
    icon: 'fa-clipboard-list'
}

let cartProps = [ becariosInDB, equiposInDB, prestamosInDB ];

function ContentRowMovies(){
  return (
    <div className="row">
      { cartProps.map( (movie, i) => {
        return <SmallCard {...movie} key={i}/>    
      })}
    </div>
  )
}

export default ContentRowMovies;