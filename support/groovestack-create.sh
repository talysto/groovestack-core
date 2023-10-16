vercomp() {
   local a b IFS=.; set -f
   printf -v a %08d $1; printf -v b %08d $3
   test $a "$2" $b
}

node_version=$(node -v | sed 's/[^0-9.]//g')
rails_version=$(rails -v | sed 's/[^0-9.]//g')
ruby_version=$(ruby -v | sed 's/[^0-9.]//g' | cut -c1-5)

echo $ruby_version
echo $rails_version
echo $node_version
if vercomp $rails_version \< 7.0; then
   echo "Please install Rails Version 7.0.x to Continue"
   exit
fi

if vercomp $ruby_version \< 3.1; then
   echo "Please install Ruby Version 3.1+ to Continue"
   exit
fi

if vercomp $node_version \< 18.0; then
   echo "Please install Node Version 16.0+ to Continue"
   exit
fi

#  TODO
# try --api (does vite still build?)
rails new $1 -d postgresql --skip-turbolinks --skip-hotwire --skip-jbuilder --skip-webpack-install -m groovestack-rails-template.rb

# echo "⚡️ Groovestack App Setup Complete"

cd $1
