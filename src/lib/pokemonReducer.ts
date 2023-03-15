import { createReducer } from '@reduxjs/toolkit';
import { getPokemonByName, pokemonApi } from './pokemonApi';
import { getPokemonList } from '@/lib/pokemonApi';

const initialState={}
export const pokemonReducer= createReducer(initialState,builder=>{
    
    builder.addMatcher(getPokemonList.matchFulfilled, (state,action)=>{
        console.log('getPokemonList.matchFulfilled', action.payload)
        state.list= action.payload
    })
    builder.addMatcher(getPokemonByName.matchFulfilled, (state,action)=>{
        console.log('getPokemonByName.matchFulfilled', action.payload)
        state.pokemon= action.payload
    })
})