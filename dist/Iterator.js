function BinarySearchTreeIterator$675(e,t){if(t=t||"v","k"!==t&&"v"!==t&&"e"!==t)throw new Error('Incorrect binary search tree iterator type "'+t+'"!');this._type=t,this._tree=e,this._last=null,this._done=!1}module.exports=BinarySearchTreeIterator$675;var IteratorResult$674=require("./IteratorResult");BinarySearchTreeIterator$675.prototype.next=function(){if(this._done)return new IteratorResult$674(void 0,!0);var e=this._last,t=this._type;if(!e){if(!this._tree.min)return this._done=!0,new IteratorResult$674(void 0,!0);switch(this._last=e=this._tree._min,t){case"k":return new IteratorResult$674(e.k,!1);case"v":return new IteratorResult$674(e.v,!1);case"e":return new IteratorResult$674([e.k,e.v],!1)}}if(e.r){for(e=e.r;e.l;)e=e.l;switch(this._last=e,t){case"k":return new IteratorResult$674(e.k,!1);case"v":return new IteratorResult$674(e.v,!1);case"e":return new IteratorResult$674([e.k,e.v],!1)}}if(!e.p)return this._done=!0,new IteratorResult$674(void 0,!0);for(;e.p.l!==e;)if(e=e.p,!e.p)return this._done=!0,new IteratorResult$674(void 0,!0);switch(this._last=e=e.p,t){case"k":return new IteratorResult$674(e.k,!1);case"v":return new IteratorResult$674(e.v,!1);case"e":return new IteratorResult$674([e.k,e.v],!1)}},Symbol&&(BinarySearchTreeIterator$675.prototype[Symbol.iterator]=function(){return this});
//# sourceMappingURL=Iterator.js.map