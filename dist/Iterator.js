function BinarySearchTreeIterator$674(e,r){if(r=r||"v","k"!==r&&"v"!==r&&"e"!==r)throw new Error('Incorrect binary search tree iterator type "'+r+'"!');this._tree=e,this._type=r,this._last=null,this._up=!1,this._im=!1,this._done=!1}function BinarySearchTreeIteratorResult$675(e,r){this.value=e,this.done=r}module.exports=BinarySearchTreeIterator$674,BinarySearchTreeIterator$674.prototype.next=function(){if(this._done)return new BinarySearchTreeIteratorResult$675(void 0,!0);var e=this._tree,r=this._last,t=e._traverse({from:r,steps:1,_ff:!0,_up:this._up,_im:this._im});if(!t)return this._done=!0,new BinarySearchTreeIteratorResult$675(void 0,!0);this._last=r=t[0],this._up=t[2],this._im=t[3];var i=this._type;return new BinarySearchTreeIteratorResult$675("v"===i&&r.v||"k"===i&&r.k||"e"===i&&[r.k,r.v],!1)},BinarySearchTreeIterator$674.prototype[Symbol.iterator]=function(){return this};
//# sourceMappingURL=Iterator.js.map