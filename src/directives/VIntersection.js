export default {
    name: 'intersection',
    mounted(el, binding) {

        //binding - сюда приходит вся информация, переданая из v-intersection
        //el - отслеживаемый элемент
        const options = {
          rootMargin: '0px',
          threshold: 1.0
        }
        const callback = (entries) => {
          if (entries[0].isIntersecting){
              //Сюда в биндинг приходит то, что мы передали из v-intersection на нашем диве(может быть как переменная, так и функции)
            binding.value()
          }
        };
        const observer = new IntersectionObserver(callback, options);
        observer.observe(el)
    },

}