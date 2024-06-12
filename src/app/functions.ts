import Swal from 'sweetalert2';

/*=============================================
Sweetalert
=============================================*/

export const Sweetalert = {

    fnc:function(type: string, text: string, url: string | null): void{

        switch (type) {

            case "error":

            if(url == null){

                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: text
                }) 

            }else{

                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: text
                }).then((result: any) => {

                    if (result.value) { 

                        window.open(url, "_top")
                    }

                })

            } 

            break; 

            case "success":

            if(url == null){

                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: text
                }) 

            }else{

                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: text
                }).then((result: any) => {

                    if (result.value) { 

                        window.open(url, "_top")
                    }

                })

            } 

            break; 

            case "loading":

              Swal.fire({
                allowOutsideClick: false,
                icon: 'info',
                text:text
              })
              Swal.showLoading()

            break; 

            case "close":

                Swal.close()

            break;

        }

       
    }

}

export function toUpperCase(value: string): string {
  return value.toUpperCase();
}