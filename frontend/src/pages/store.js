import { atom,selector } from 'recoil';

export const cartArr =  atom ({
    key: 'cartArr',
    default:[],
});

export const catArrWithBasePrice = selector({
    key: 'catArrWithBasePrice',
    get: ({ get }) => {
      return get(cartArr);
    },
    set: ({ set }, newValue) => {
        console.log('new val',newValue);
      const newData = newValue.filter((item)=>item.quantity).map((item) => {
       
        return {
          ...item,
          basePrice:item.basePrice || item.price,
        };
      });
      set(cartArr, newData);
    },
  });