          <Accordion
            key={DASHBOARD_MENU.key}
            className="pl-5 pr-4 lg:pr-2 py-3 hover:bg-gray-100"
            Icon={MdKeyboardArrowDown}
            iconClassName="duration-300"
            title={
              <div className="flex items-center gap-5">
                <DASHBOARD_MENU.icon className="w-6 h-6 text-[#783cf1]" />{" "}
                {DASHBOARD_MENU.label}
              </div>
            }
          >
            {DASHBOARD_MENU.sub_menu.map((sub) => renderMenuItem(sub, true))}
          </Accordion>

// การใช้งานพื้นฐาน
<Accordion
  Icon={RiArrowDownSLine}
  title="หัวข้อ"
>
  เนื้อหา
</Accordion>

// กำหนด style ทั้งสองสถานะ
<Accordion
  Icon={RiArrowDownSLine}
  iconClassName="w-5 h-5 transition-smooth"
  iconInactiveClassName="text-gray-400"
  iconActiveClassName="text-blue-500 rotate-180"
  title="หัวข้อ"
>
  เนื้อหา
</Accordion>

// กำหนด animation ที่ซับซ้อน
<Accordion
  Icon={RiArrowDownSLine}
  iconClassName="w-6 h-6 transition-all duration-300"
  iconInactiveClassName="text-gray-400 hover:text-gray-600"
  iconActiveClassName="text-primary-500 rotate-180 scale-110"
  title="หัวข้อ"
>
  เนื้อหา
</Accordion>
