export const socketHandler = (io) => {
    const namespace = io.of('/orders/delivery');
  
    namespace.on('connection', (socket) => {
      console.log('UN CLIENTE SE CONECTÓ A SOCKET IO -> /orders/delivery');
  
      socket.on('position', (data) => {
        console.log('CLIENTE EMITIÓ: ', data);
        namespace.emit(`position/${data.id_order}`, { 
          id_order: data.id_order, 
          lat: data.lat, 
          lng: data.lng 
        });
      });
  
      socket.on('disconnect', () => {
        console.log('UN CLIENTE SE DESCONECTÓ DE SOCKET IO');
      });
    });
  };