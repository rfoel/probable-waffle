import Router from 'next/router';

export default (target, ctx = {}) => {
  if (ctx.res) {
    ctx.res.writeHead(302, { Location: target });
    ctx.res.end();
  } else {
    Router.replace(target);
  }
};
