'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const { actionForKeyEvent } = require('../templates/input.js');

test('physical WASD moves in both English and Russian layouts', () => {
  const cases = [
    ['KeyW','w','\u0446','up'],
    ['KeyA','a','\u0444','left'],
    ['KeyS','s','\u044b','down'],
    ['KeyD','d','\u0432','right'],
  ];
  for (const [code,en,ru,want] of cases) {
    assert.equal(actionForKeyEvent({ code, key:en }),want);
    assert.equal(actionForKeyEvent({ code, key:ru }),want);
  }
});

test('ability, interaction and gravity do not depend on keyboard layout', () => {
  const cases = [
    ['KeyQ','q','\u0439','ability'],
    ['KeyE','e','\u0443','interact'],
    ['KeyG','g','\u043f','gravity'],
  ];
  for(const [code,en,ru,want] of cases){
    assert.equal(actionForKeyEvent({code,key:en}),want);
    assert.equal(actionForKeyEvent({code,key:ru}),want);
  }
});

test('arrow keys, space, shift and escape stay available',()=>{
  assert.equal(actionForKeyEvent({code:'ArrowLeft',key:'ArrowLeft'}),'left');
  assert.equal(actionForKeyEvent({code:'ArrowRight',key:'ArrowRight'}),'right');
  assert.equal(actionForKeyEvent({code:'ArrowUp',key:'ArrowUp'}),'up');
  assert.equal(actionForKeyEvent({code:'Space',key:' '}),'secondary');
  assert.equal(actionForKeyEvent({code:'ShiftLeft',key:'Shift'}),'sneak');
  assert.equal(actionForKeyEvent({code:'Escape',key:'Escape'}),'pause');
});

test('fallback for browsers without a usable code',()=>{
  assert.equal(actionForKeyEvent({code:'Unidentified',key:'\u0439'}),'ability');
  assert.equal(actionForKeyEvent({code:'',key:'\u0443'}),'interact');
  assert.equal(actionForKeyEvent({key:'ArrowDown'}),'down');
});

test('unknown and malformed keyboard events have no game action',()=>{
  assert.equal(actionForKeyEvent({code:'Digit1',key:'1'}),null);
  assert.equal(actionForKeyEvent(null),null);
  assert.equal(actionForKeyEvent({}),null);
});
