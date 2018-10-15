#!/bin/sh

# ------
# Download Fontello CSS/Font Files to public folder
# @see https://github.com/ryantsangai/fontello-cli
#
SESSION_PATH='./.fontello.session'
OUTPUT_BASE_FOLDER='./public/static/fontello'
CONFIG_PATH='./public/static/fontello/config.json'

./node_modules/.bin/fontello install --config $CONFIG_PATH --session $SESSION_PATH --css $OUTPUT_BASE_FOLDER/css --font $OUTPUT_BASE_FOLDER/font
