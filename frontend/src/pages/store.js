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
    set: ({set}, newValue)=>{
      const newData = newValue.filter(item=>item.quantity).map((item)=>{
          const basePrice = item.basePrice || item.price
          const totalPrice = basePrice * item.quantity
          return {
              ...item,
              price: totalPrice,
              basePrice: basePrice,
          }
      })
      set(cartArr, newData)
  }
  });