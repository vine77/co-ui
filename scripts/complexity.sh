cd ~/co-ui

git checkout $(git rev-list -n 1 --before="$(node -p "require('moment')().startOf('month').subtract(3, 'month').unix()")" master)
find ~/co-ui -name "*.js" -print0 | xargs -0 sed -i "" "s/^export default/var _default =/g"
find ~/co-ui -name "*.js" -print0 | xargs -0 sed -i "" "s/^import/\/\/import/g"
plato -r -d ~/plato/co-ui -t "CO UI" -D `node -p "require('moment')().startOf('month').subtract(3, 'month').unix()"` ~/co-ui/app/**/*.js
git checkout HEAD .

git checkout $(git rev-list -n 1 --before="$(node -p "require('moment')().startOf('month').subtract(2, 'month').unix()")" master)
find ~/co-ui -name "*.js" -print0 | xargs -0 sed -i "" "s/^export default/var _default =/g"
find ~/co-ui -name "*.js" -print0 | xargs -0 sed -i "" "s/^import/\/\/import/g"
plato -r -d ~/plato/co-ui -t "CO UI" -D `node -p "require('moment')().startOf('month').subtract(2, 'month').unix()"` ~/co-ui/app/**/*.js
git checkout HEAD .

git checkout $(git rev-list -n 1 --before="$(node -p "require('moment')().startOf('month').subtract(1, 'month').unix()")" master)
find ~/co-ui -name "*.js" -print0 | xargs -0 sed -i "" "s/^export default/var _default =/g"
find ~/co-ui -name "*.js" -print0 | xargs -0 sed -i "" "s/^import/\/\/import/g"
plato -r -d ~/plato/co-ui -t "CO UI" -D `node -p "require('moment')().startOf('month').subtract(1, 'month').unix()"` ~/co-ui/app/**/*.js
git checkout HEAD .

git checkout $(git rev-list -n 1 --before="$(node -p "require('moment')().startOf('month').unix()")" master)
find ~/co-ui -name "*.js" -print0 | xargs -0 sed -i "" "s/^export default/var _default =/g"
find ~/co-ui -name "*.js" -print0 | xargs -0 sed -i "" "s/^import/\/\/import/g"
plato -r -d ~/plato/co-ui -t "CO UI" -D `node -p "require('moment')().startOf('month').unix()"` ~/co-ui/app/**/*.js
git checkout HEAD .

git checkout master
