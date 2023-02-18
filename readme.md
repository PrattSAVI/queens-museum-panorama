# Queens Museum Panorama 
bump
## Hosted on GitHub pages

Use the following links to view the prototype
- [Main section](https://murraycox.github.io/queens-museum-panorama/), working on styling

## Running on your local machine

### Fork the respository

Fork the project via [GitHub](https://docs.github.com/en/get-started/quickstart/contributing-to-projects) or with [Command Line Tools](https://gist.github.com/Chaser324/ce0505fbed06b947d962)

#### Command line tools example

After you fork the project into your account, you want to pull the fork down to your local environment.
CD into the parent folder you want to clone the repository into, and type (it will create a directory named *queens-museum-panoroma* in the current directory):
```
git clone  https://github.com/[your_github_user_name]/queens-museum-panorama
```

CD into the new directory, and then add the 'upstream' repo to list of remotes for your local project (so git knows where to get updates from, or where to post pull requests to
)
```
git remote add upstream https://github.com/murraycox/queens-museum-panorama.git
```

Verify the new remote named 'upstream'
```
git remote -v
```

### Run with a webserver

python or http-server are good options

#### python

cd to the directory of the repository and use:

```
python3 -m http.server
```

#### http-server

install http-server with the following npm command (-g = global)

```
npm -i -g http-server?
```

cd to the directory of the repository and use:

```
http-server
```

### Pulling the latest code from the upstream repository

TODO

### Posting a pull request to the upstream repository

For when you've made changes locally and want to upload them to https://github.com/murraycox/queens-museum-panorama.git

Make sure you've added and committed all of your changes into your local repository

TODO

## Design

The design of the Queens Museum Panorama project has been optimized to be displayed landscape on the Apple iPad A2602 models which are currently used for exhibitions.

9th Generation iPad, A2602
Design Specs:
10.2" diagonal
* Retina display
* 2160-by-1620-pixel resolution at 264 pixels per inch (ppi)
* (Screen Size: 1080-by-810, device independent pixels ‘points’ for CSS)
* The web application running full screen is 1080-by-790 (20 pixels for the iPad status bar at the top)

[Other Tech specs](https://support.apple.com/kb/SP849?locale=en_US)


