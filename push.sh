rsync --exclude "template" --exclude ".git" --exclude "node_modules" -rvaz -e ssh ./ raadad@env:/srv/isupply/site

