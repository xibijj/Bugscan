def scan_cms(line):
	global result_key
	if len(line)>0:
		l=line.split('::')
		web_dir=l[0]
		hash=l[1]
		cms_version=l[-1]
		web='http://'+test_url+web_dir
		try:
			_html=fuck.urlget(web).read()
			_md5=fuck.get_md5(_html)
			if _md5==hash and result_key<1:
				result_key=1
				result='%s => %s'%(test_url,cms_version)
				print result
				fuck.report('what_cms',result)
				exploit_it(cms_version)
				sys.exit(1)
		except Exception,e:
			print e
print 'start'
result_key=0
html_str=fuck.urlget('http://'+_B+'/data/cms.txt').read()
cms_md5_list=html_str.split('\r\n')
fuck.thread(scan_cms,cms_md5_list,10)
print 'end'
