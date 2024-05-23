import React from 'react';
import MenuItem from './MenuItem';
const HeaderMenu = () => {
    const menu= [
        {
          title: 'تعاریف',
          subMenus: [
            {title: 'اشخاص',src: '/dashboard',},
            {title: 'گروه اشخاص',src: '/dashboard',},
            {title: 'انبارها',src: '/dashboard',},
            {title: 'کاربران',src: '/dashboard',},
           ],
        },
        {
          title: 'محصولات',
      
          subMenus: [
            {title: ' مشتریان',src: '/dashboard/shop/customers',},
            {title: 'سفارشات', src: '/dashboard/shop/orders',},   
          ],
      
        },
        {
          title: 'انبارگردانی',
      
          subMenus: [
            {title: 'کاربران',src: '/dashboard/community/users', },
            {title: 'پروفایل',src: '/dashboard/community/profile', },    
          ],  
        },
       
       
      ];
    return (
        <div className='bg-gray-100 border-b-2 font-light' >
        <ul className='flex mx-4 h-10 items-center *:px-2 text-sm'>
         {
            menu.map((item,index)=>(
              <MenuItem key={index} menuItem={item} />
            )
            )
         }
         </ul>
        </div>
    );
};

export default HeaderMenu;