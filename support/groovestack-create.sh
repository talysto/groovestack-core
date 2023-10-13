vercomp() {
   local a b IFS=. -; set -f
   printf -v a %08d $1; printf -v b %08d $3
   test $a "$2" $b
}

node_version=$(node -v | sed 's/[^0-9.]//g')
rails_version=$(rails -v | sed 's/[^0-9.]//g')
ruby_version=$(ruby -v | sed 's/[^0-9.]//g')

echo $ruby_version
echo $rails_version
echo $node_version

# if vercomp $ruby_version \< 3.2; then
#    echo "need to upgrade ruby version to at least 3.1.3"
#    exit
# fi

#  TODO
# try --api (does vite still build?)
rails new $1 -d postgresql --skip-turbolinks --skip-hotwire --skip-jbuilder --skip-webpack-install -c sass -m groovestack-rails-template.rb

# echo "⚡️ Groovestack App Setup Complete"

cd $1
