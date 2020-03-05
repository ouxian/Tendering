package my.metro.controller;


import my.metro.entities.Bidwin;
import my.metro.entities.Caigou;
import my.metro.service.BidwinService;
import my.metro.service.CaigouService;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@RequestMapping("/Bidwin")
public class BidwinController {
	String type = null;
	
	@Autowired
	BidwinService bidwinService;

	@RequestMapping("/gdpindex_winCom")
	public String WinCom_Hist()
	{
		return "index/gdpindex_winCom";
	}

	@RequestMapping("/gdpindex_winCom_Pie")
	public String WinCom_Pie()
	{
		return "index/gdpindex_winCom_Pie";
	}

	@RequestMapping("/gdpindex_winCom_Select")
	public String WinCom_Select()
	{
		return "index/gdpindex_winCom_Select";
	}

	//根据年份查询对应的中标信息
	@RequestMapping("/getBidAllByYear")
	@ResponseBody
	public List<Bidwin> getAllByYear(Bidwin caigou)
	{
		return bidwinService.getAllByYear(caigou);
	}

	//根据城市名查询对应的中标信息
	@RequestMapping("/getBidAllByCity")
	@ResponseBody
	public List<Bidwin> getAllByCity(@Param(value = "city") String city)
	{
		return bidwinService.getAllByCity(city);
	}

	//根据单位名查询对应的中标信息
	@RequestMapping("/getBidAllByCompany")
	@ResponseBody
	public List<Bidwin> getAllByCompany(@Param(value = "WinbidCompany") String WinbidCompany)
	{

		return bidwinService.getAllByCompany(WinbidCompany);
	}

	//根据年份和城市名查找对应的中标信息
	@RequestMapping("/getBidAllByYearAndCity")
	@ResponseBody
	public List<Bidwin> getAllByYearAndCity(Bidwin bidwin)
	{
		return bidwinService.getAllByYearAndCity(bidwin);
	}

	//根据单位名城市和年份查找对应中标信息
	@RequestMapping("/getBidAllByYearCityCompany")
	@ResponseBody
	public List<Bidwin> getAllByYearCityCompany(Bidwin bidwin)
	{
		return bidwinService.getAllByYearCityCompany(bidwin);
	}

	//根据公司名和年份查找对应中标信息
	@RequestMapping("/getBidAllByYearAndCompany")
	@ResponseBody
	public List<Bidwin> getAllByYearAndCompany(Bidwin bidwin)
	{
		return bidwinService.getAllByYearAndCompany(bidwin);
	}

	//根据城市名和公司名查找对应中标信息
	@RequestMapping("/getBidAllByCityAndCompany")
	@ResponseBody
	public List<Bidwin> getAllByCityAndCompany(Bidwin bidwin)
	{
		return bidwinService.getAllByCityAndCompany(bidwin);
	}

	//根据年份单位名查询同类型设计机构在每个市的中标总金额
	@RequestMapping("/getSumByCompanyYear")
	@ResponseBody
	public List<Bidwin> getSumByCompanyYear(Bidwin bidwin)
	{
		return bidwinService.getSumByCompanyYear(bidwin);
	}

    //根据年份城市查询同类型设计机构在每个市的中标总金额
    @RequestMapping("/getSumByYearCity")
    @ResponseBody
    public List<Bidwin> getSumByYearCity(Bidwin bidwin)
    {
        return bidwinService.getSumByYearCity(bidwin);
    }



}
