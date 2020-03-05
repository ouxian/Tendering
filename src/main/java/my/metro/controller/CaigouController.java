package my.metro.controller;


import my.metro.entities.*;
import my.metro.service.*;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@RequestMapping("/caigou")
public class CaigouController {
	String type = null;
	
	@Autowired
	CaigouService caigouService;

	@RequestMapping("/gdpindex_caiGou_Select")
	public String CaigouIndexSelect()
	{
		return "index/gdpindex_caiGou_Select";
	}

/*
* 根据年份查询对应的采购金额总量
* */
	@RequestMapping("/getCaigouListByYear")
	@ResponseBody
	public List<Caigou> getListByYear(Caigou caigou)
	{
		return caigouService.getListByYear(caigou);
	}

	//根据城市名查询对应的采购金额总量
	@RequestMapping("/getCaigouListByCity")
	@ResponseBody
	public List<Caigou> getListByCity(Caigou caigou)
	{
		return caigouService.getListByCity(caigou);
	}

	//根据年份查询所有的采购信息
	@RequestMapping("/getCaigouAllByYear")
	@ResponseBody
	public List<Caigou> getAllByYear(Caigou caigou)
	{
//	    System.out.print(caigouService.getAllByYear(caigou));
		return caigouService.getAllByYear(caigou);
	}

	//根据城市名查询所有的采购信息
	@RequestMapping("/getCaigouAllByCity")
	@ResponseBody
	public List<Caigou> getAllByCity(@Param(value = "city") String city)
	{
		return caigouService.getAllByCity(city);
	}

    //根据采购类型查询所有的采购信息
    @RequestMapping("/getCaigouAllByItemType")
    @ResponseBody
    public List<Caigou> getListByItemType(@Param(value = "itemType") String itemType)
    {
        System.out.print(itemType);
        return caigouService.getListByItemType(itemType);
    }

	//根据年份和城市名查找采购所有信息
	@RequestMapping("/getCaigouByYearAndCity")
	@ResponseBody
	public List<Caigou> getAllByYearAndCity(Caigou caigou)
	{
		return caigouService.getAllByYearAndCity(caigou);
	}

}
