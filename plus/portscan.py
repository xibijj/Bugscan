def portscan(port):
	if fuck.checkport(test_ip,port):
		fuck.report('portscan','%s %s Open'%(test_ip,port))
		print '%s %s Open'%(test_ip,port)
print 'start'
post_list=['21','22','23','80','135','139','445','1433','1723','3306','3389','5800','5901','8080','8081','8082']
fuck.thread(portscan,post_list,10)
#locatip=fuck.localip()
#sart=locatip.split('.')
#ip_prefix='%s.%s.%s'%(sart[0],sart[1],sart[2])
#for i in range(1,10):
#	ip=fuck.pinger('%s.%s'%(ip_prefix,i))
#	if ip:
#		portscan(ip)
print 'end'
