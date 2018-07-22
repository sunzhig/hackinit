import { isUrl } from '../utils/utils';

const menuData = [{
  name: '首页',
  icon: 'home',
  path: 'home',
}, {
  name: '个人信息',
  icon: 'profile',
  path: 'person',
}, {
  name: '踢出名堂',
  path: 'game',
  icon: 'bars',
  children: [{
    name: '前锋',
    path: 'front',
    icon: 'flag',
  }, {
    name: '门将',
    path: 'door',
    icon: 'flag',
  }],
}, {
  name: '排行榜',
  path: 'list',
  icon: 'contacts',
}];

function formatter(data, parentPath = '', parentAuthority) {
  return data.map((item) => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
