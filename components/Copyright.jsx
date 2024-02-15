import Link from "next/link"
import colors from "@/config/colors"

export const CopyRight = () => {

    return (
        <div className='text-white text-sm text-muted-foreground text-center py-4'
        // style={{ backgroundColor:colors?.sidebarColor }}
        >
        <p className='block text-muted-foreground'>
          @ All rights reserved 2023
        </p>
        <p className='text-muted-foreground'>
          TriboAI |{" "}
          <Link
            href={
              "https://www.appwizardpro.com"
            }>
            App Wizard
          </Link>
        </p>
      </div>
    )
}